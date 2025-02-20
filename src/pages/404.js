import React, { useRef, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo.jsx"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    canvas.width = 600
    canvas.height = 120

    // Game variables
    let gameState = "start"
    let score = 0
    let speed = 0
    let acceleration = 0.001
    let nextObstacleDistance = 0
    let seahorse = new Seahorse()
    let obstacles = []

    // Key states
    const keys = { up: false, down: false, space: false }

    // Event listeners
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" || e.key.toLowerCase() === "f") keys.up = true
      if (e.key === "ArrowDown" || e.key.toLowerCase() === "j") keys.down = true
      if (e.key === "s") keys.space = true
    }
    const handleKeyUp = (e) => {
      if (e.key === "ArrowUp" || e.key.toLowerCase() === "f") keys.up = false
      if (e.key === "ArrowDown" || e.key.toLowerCase() === "j") keys.down = false
      if (e.key === "s") keys.space = false
    }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    // Game loop
    const gameLoop = () => {
      if (gameState === "playing") {
        seahorse.update(keys)
        obstacles.forEach(obs => obs.update(speed))
        obstacles = obstacles.filter(obs => !obs.offscreen())
        if (nextObstacleDistance <= 0) {
          obstacles.push(new Obstacle(Math.random() < 0.5 ? "bottom" : "top", canvas.width, canvas.height))
          nextObstacleDistance = Math.random() * (200 - 75) + 75
        } else {
          nextObstacleDistance -= speed
        }
        for (let obs of obstacles) {
          if (seahorse.collidesWith(obs)) gameState = "gameover"
        }
        speed += acceleration
        score += speed / 60
      } else if ((gameState === "start" || gameState === "gameover") && keys.space) {
        gameState = "playing"
        score = 0
        speed = 3
        obstacles = []
        nextObstacleDistance = 0
        seahorse = new Seahorse()
      }

      // Render
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "black"
      seahorse.draw(ctx)
      if (gameState === "playing") {
        obstacles.forEach(obs => obs.draw(ctx))
        ctx.font = "16px Arial"
        ctx.textAlign = "right"
        ctx.fillText(Math.floor(score), canvas.width - 10, 20)
      } else if (gameState === "start") {
        ctx.font = "16px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Press S to start", canvas.width / 2, canvas.height / 2 - 30)
        ctx.fillText("Press F or ↑ to go up", canvas.width / 2, canvas.height / 2 - 10)
        ctx.fillText("Press J or ↓ to go down", canvas.width / 2, canvas.height / 2 + 10)
      } else if (gameState === "gameover") {
        ctx.font = "20px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 20)
        ctx.fillText("Score: " + Math.floor(score), canvas.width / 2, canvas.height / 2)
        ctx.fillText("Press S to restart", canvas.width / 2, canvas.height / 2 + 20)
      }

      requestAnimationFrame(gameLoop)
    }
    gameLoop()

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="404: Not Found" pathname="404" />
      <h1>Not Found</h1>
      <p>Oops! This page swam away... dodge obstacles while you’re here!</p>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
      </div>
    </Layout>
  )
}

// Seahorse class
class Seahorse {
  constructor() {
    this.shape = [
      '  XXX    ',
      ' X   X   ',
      'X   X XXX',
      'X     X  ',
      ' X   X   ',
      'X   X    ',
      ' X   X   ',
      'X     X  ',
      ' X    X  ',
      'X     X  ',
      ' X   X   ',
      'X   X    ',
      ' X X  XX ',
      '  X  X  X',
      '  X    X ',
      '   X  X  ',
      '    XX   '
    ]
    this.width = this.shape[0].length * 2
    this.height = this.shape.length * 2
    this.x = 50 // Fixed horizontal position
    this.y = 60 // Starting vertical position
    this.speed = 2
  }
  update(keys) {
    if (keys.up) this.y -= this.speed
    if (keys.down) this.y += this.speed
    this.y = Math.max(0, Math.min(this.y, 120 - this.height))
  }
  draw(ctx) {
    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[i].length; j++) {
        if (this.shape[i][j] === "X") ctx.fillRect(this.x + j * 2, this.y + i * 2, 2, 2)
      }
    }
  }
  collidesWith(obs) {
    return (
      this.x < obs.x + obs.width &&
      this.x + this.width > obs.x &&
      this.y < obs.y + obs.height &&
      this.y + this.height > obs.y
    )
  }
}

// Bottom obstacle shapes
const bottomShapes = [
  ['X  X  X', ' X X X ', 'X  X  X', ' X X X ', 'X  X  X', ' X X X ', 'X  X  X', ' X X X ', 'X  X  X', ' X X X ', 'X  X  X', 'XXXXXXX'],
  ['  X  ', ' X X ', 'X   X', ' X X ', '  X  ', '  X  ', ' X X ', 'X   X', ' X X ', '  X  ', '  X  ', ' X X ', 'X   X', ' X X ', '  X  ', 'XXXXX'],
  ['X', ' X', 'X', ' X', 'X', ' X', 'X', ' X', 'X', ' X', 'X', ' X', 'X', ' X', 'X', ' X', 'X', ' X', 'X', ' X', 'X', ' X']
]

// Top obstacle shapes
const topShapes = [
  ['XXXXXXX', 'X  X  X', ' X X X ', 'X  X  X', ' X X X ', 'X  X  X', ' X X X ', 'X  X  X', ' X X X ', 'X  X  X', ' X X X ', 'X  X  X'],
  ['XXXXX', '  X  ', ' X X ', 'X   X', ' X X ', '  X  ', '  X  ', ' X X ', 'X   X', ' X X ', '  X  ', '  X  ', ' X X ', 'X   X', ' X X ', '  X  '],
  [' X', 'X', ' X', 'X', ' X', 'X', ' X', 'X', ' X', 'X', ' X', 'X', ' X', 'X', ' X', 'X', ' X', 'X', ' X', 'X', ' X', 'X']
]

// Obstacle class
class Obstacle {
  constructor(type, canvasWidth, canvasHeight) {
    this.type = type
    this.shape = type === "bottom"
      ? bottomShapes[Math.floor(Math.random() * bottomShapes.length)]
      : topShapes[Math.floor(Math.random() * topShapes.length)]
    this.width = this.shape[0].length * 2
    this.height = this.shape.length * 2
    this.y = type === "bottom" ? canvasHeight - this.height : 0
    this.x = canvasWidth
  }
  update(speed) {
    this.x -= speed
  }
  draw(ctx) {
    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[i].length; j++) {
        if (this.shape[i][j] === "X") ctx.fillRect(this.x + j * 2, this.y + i * 2, 2, 2)
      }
    }
  }
  offscreen() {
    return this.x < -this.width
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
