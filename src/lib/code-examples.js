import hljs from 'highlight.js/lib/common'

// Ghost has no highlight.js grammar of its own. TypeScript is what the docs
// already tag Ghost snippets with, and it covers the syntax Ghost shares with
// it: classes, functions, template literals, comments, and strings.
const LANGUAGE = 'typescript'

// The projects shown on the home page, each a set of files from one working
// example rather than disconnected snippets, so the tabs show how a real
// program is actually split up.
//
// Lumen's files are the `04_collision` example from the engine's own
// repository. Ghost's are written against the syntax the docs describe: the
// examples in the Ghost repository still use the pre-0.30 forms (`function
// constructor()`, and instantiating without `new`) and would be wrong here.
const PROJECTS = [
  {
    id: 'ghost',
    name: 'Ghost',
    tagline: 'A small, object-oriented scripting language.',
    href: '/docs',
    files: [
      {
        name: 'main.gs',
        code: `import Graph from "graph"
import shortestPath from "dijkstra"

network = new Graph()

network.connect("depot", "market", 2)
network.connect("depot", "harbor", 7)
network.connect("market", "harbor", 3)
network.connect("market", "airfield", 8)
network.connect("harbor", "airfield", 4)

route = shortestPath(network, "depot", "airfield")

if (route == null) {
  console.log("no route")
} else {
  console.log(\`route: \${route.path.join(" -> ")}\`)
  console.log(\`distance: \${route.distance}\`)
}

// >> route: depot -> market -> harbor -> airfield
// >> distance: 9`,
      },
      {
        name: 'graph.gs',
        code: `// An undirected weighted graph, held as a map of maps:
// { depot: { market: 2, harbor: 7 }, ... }
class Graph {
  constructor() {
    this.edges = {}
  }

  connect(from, to, weight) {
    this.link(from, to, weight)
    this.link(to, from, weight)
  }

  link(from, to, weight) {
    if (!this.edges.has(from)) {
      this.edges[from] = {}
    }

    // Maps are held by reference, so writing through this
    // binding updates the one stored on the graph.
    connections = this.edges[from]
    connections[to] = weight
  }

  neighbors(node) {
    return this.edges.get(node, {})
  }

  nodes() {
    return this.edges.keys()
  }
}`,
      },
      {
        name: 'dijkstra.gs',
        code: `// Dijkstra's algorithm: the cheapest route between two
// nodes of a weighted graph.
UNREACHABLE = 1000000

function shortestPath(graph, start, goal) {
  distances = {}
  previous = {}
  pending = []

  for (node in graph.nodes()) {
    distances[node] = UNREACHABLE
    pending.push(node)
  }

  distances[start] = 0

  while (!pending.isEmpty()) {
    // Cheapest known node first. Sorting each round keeps
    // this readable; a heap is what you would reach for
    // once the graph stops being small.
    pending = pending.sort(function (a, b) {
      return distances[a] - distances[b]
    })

    current = pending.shift()

    // Everything still pending is at least as far off as this
    // one, so if this is unreachable then so is the goal.
    if (distances[current] == UNREACHABLE) {
      return null
    }

    if (current == goal) {
      return { path: trace(previous, start, goal), distance: distances[goal] }
    }

    for (neighbor, weight in graph.neighbors(current)) {
      step = distances[current] + weight

      if (step < distances[neighbor]) {
        distances[neighbor] = step
        previous[neighbor] = current
      }
    }
  }

  return null
}

// Walk the breadcrumbs back from the goal, then flip them.
function trace(previous, start, goal) {
  path = [goal]
  node = goal

  while (node != start) {
    node = previous[node]
    path.push(node)
  }

  return path.reverse()
}`,
      },
    ],
  },
  {
    id: 'lumen',
    name: 'Lumen',
    tagline: 'A 2D game engine, with Ghost built in.',
    href: '/docs/lumen',
    files: [
      {
        name: 'main.gs',
        code: `import "lumen:canvas"
import "lumen:color"
import "lumen:font"
import "lumen:window"
import Player from 'player'
import Battle from 'battle'

game = { player: null, battle: null, ui: null }

function load() {
  window.setTitle('Tiny RPG')

  game.ui = font.system(12)
  game.player = new Player(120, 90)
}

function update(dt) {
  if (game.battle == null) {
    game.player.update(dt)

    if (game.player.inGrass()) {
      game.battle = new Battle(game.player)
    }
  } else {
    game.battle.update()

    if (game.battle.isOver()) {
      game.battle = null
      game.player.retreat()
    }
  }
}

function draw() {
  canvas.scale(2)
  canvas.setFont(game.ui)

  if (game.battle == null) {
    drawWorld()
    game.player.draw()
  } else {
    game.battle.draw()
  }
}

function drawWorld() {
  canvas.setColor(color.rgb(38, 58, 40))
  canvas.filledRectangle(0, 120, 400, 80)

  canvas.setColor(color.white)
  canvas.print('wasd to move, walk into the grass', 12, 12)
}`,
      },
      {
        name: 'player.gs',
        code: `import "lumen:canvas"
import "lumen:color"
import "lumen:keyboard"

class Player {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = 12
    this.speed = 90
    this.health = 30
    this.power = 6
  }

  update(dt) {
    if (keyboard.isDown('left', 'a'))  { this.x = this.x - this.speed * dt }
    if (keyboard.isDown('right', 'd')) { this.x = this.x + this.speed * dt }
    if (keyboard.isDown('up', 'w'))    { this.y = this.y - this.speed * dt }
    if (keyboard.isDown('down', 's'))  { this.y = this.y + this.speed * dt }
  }

  // The grass starts at y 120, and is where encounters happen.
  inGrass() {
    return this.y > 120
  }

  retreat() {
    this.y = 108
  }

  draw() {
    canvas.setColor(color.rgb(232, 200, 120))
    canvas.filledRectangle(this.x, this.y, this.size, this.size)
  }
}`,
      },
      {
        name: 'battle.gs',
        code: `import "lumen:canvas"
import "lumen:color"
import "lumen:keyboard"

class Battle {
  constructor(player) {
    this.player = player
    this.health = 24
    this.power = 4
    this.message = 'a slime blocks the path'
  }

  update() {
    if (keyboard.wasPressed('space')) {
      this.exchange()
    }
  }

  // One round: you swing, and if anything is left of it,
  // it swings back.
  exchange() {
    this.health = this.health - this.player.power

    if (this.health <= 0) {
      this.message = 'the slime dissolves'
    } else {
      this.player.health = this.player.health - this.power
      this.message = \`you hit \${this.player.power}, took \${this.power}\`
    }
  }

  isOver() {
    return this.health <= 0 or this.player.health <= 0
  }

  draw() {
    canvas.setColor(color.rgb(18, 18, 28))
    canvas.filledRectangle(0, 0, 400, 200)

    canvas.setColor(color.rgb(120, 220, 140))
    canvas.filledRectangle(160, 48, 40, 32)

    canvas.setColor(color.white)
    canvas.print(\`slime  \${this.health} hp\`, 12, 12)
    canvas.print(\`you    \${this.player.health} hp\`, 12, 28)
    canvas.print(this.message, 12, 156)
    canvas.print('space to attack', 12, 172)
  }
}`,
      },
    ],
  },
]

/**
 * The examples with every file highlighted.
 *
 * Highlighting happens here rather than in the browser: the home page is a
 * server component, so this runs once at build time and highlight.js never
 * reaches the client bundle.
 */
export function getCodeExamples() {
  return PROJECTS.map(project => ({
    ...project,
    files: project.files.map(file => ({
      name: file.name,
      lineCount: file.code.split('\n').length,
      html: hljs.highlight(file.code, { language: LANGUAGE }).value,
    })),
  }))
}
