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
        code: `import Player from "player"

party = [
  new Player("Artemis", 100),
  new Player("Orion", 80),
  new Player("Lyra", 95)
]

for (index, member in party) {
  console.log(\`\${index}: \${member.name}\`)
}

wounded = party.filter(function (member, index) {
  return member.health < 100
})

console.log(\`\${wounded.length()} need healing\`)`,
      },
      {
        name: 'player.gs',
        code: `class Player {
  constructor(name, health) {
    this.name = name
    this.health = health
  }

  damage(amount) {
    this.health = this.health - amount

    if (this.health < 0) {
      this.health = 0
    }
  }

  describe() {
    console.log(\`\${this.name}: \${this.health} health\`)
  }
}`,
      },
      {
        name: 'server.gs',
        code: `import "ghost:http"

http.handle("/", function (request) {
  console.log("hello from ghost")
})

http.listen(3000, function () {
  console.log("listening on http://localhost:3000")
})`,
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
import Player from 'player'
import Enemy from 'enemy'

player = new Player()
enemy = new Enemy()

function update() {
  enemy.update()
  player.update()

  player.onCollision(enemy)
}

function draw() {
  canvas.scale(2)

  enemy.draw()
  player.draw()
}`,
      },
      {
        name: 'player.gs',
        code: `import "lumen:canvas"
import "lumen:color"
import "lumen:keyboard"
import Entity from 'entity'

class Player extends Entity {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
    this.size = 16
    this.speed = 4
    this.damaged = false
  }

  update() {
    if (keyboard.isDown('w')) { this.y = this.y - this.speed }
    if (keyboard.isDown('s')) { this.y = this.y + this.speed }
    if (keyboard.isDown('a')) { this.x = this.x - this.speed }
    if (keyboard.isDown('d')) { this.x = this.x + this.speed }
  }

  onCollision(other) {
    this.damaged = this.overlaps(other)
  }

  draw() {
    canvas.setColor(color.white)

    if (this.damaged) {
      canvas.setColor(color.rgb(255, 0, 0))
    }

    canvas.filledRectangle(this.x, this.y, this.size, this.size)
  }
}`,
      },
      {
        name: 'enemy.gs',
        code: `import "lumen:canvas"
import "lumen:color"

class Enemy {
  constructor() {
    this.x = 175
    this.y = 100
    this.size = 50
  }

  draw() {
    canvas.setColor(color.rgb(255, 0, 0))
    canvas.rectangle(this.x, this.y, this.size, this.size)
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
