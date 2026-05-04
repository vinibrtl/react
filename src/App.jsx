import { useState } from "react"

function App() {
  const gerarCartas = () => {
    const emojis = ['🍎', '🍎', '🚀', '🚀', '👾', '👾', '🎲', '🎲']
      .sort(() => Math.random() - 0.5)

    return emojis.map((emoji, index) => ({
      id: index,
      emoji,
      revelada: false
    }))
  }

  const [cartas, setCartas] = useState(gerarCartas())
  const [carta1, setCarta1] = useState(null)
  const [carta2, setCarta2] = useState(null)
  const [pares, setPares] = useState(0)
  const [vitorias, setVitorias] = useState(0) // contador

  function reiniciarJogo() {
    setCartas(gerarCartas())
    setCarta1(null)
    setCarta2(null)
    setPares(0)
  }

  function handleClick(carta) {
    if (carta.revelada || carta2 !== null) return

    const novasCartas = cartas.map(c =>
      c.id === carta.id ? { ...c, revelada: true } : c
    )

    setCartas(novasCartas)

    if (!carta1) {
      setCarta1(carta)
    } else {
      setCarta2(carta)

      if (carta1.emoji === carta.emoji) {
        const novosPares = pares + 1
        setPares(novosPares)

        if (novosPares === 4) {
          setVitorias(v => v + 1)

          setTimeout(() => {
            reiniciarJogo()
          }, 2000) // espera 2s antes de resetar
        }

        setCarta1(null)
        setCarta2(null)
      } else {
        setTimeout(() => {
          setCartas(prev =>
            prev.map(c =>
              c.id === carta.id || c.id === carta1.id
                ? { ...c, revelada: false }
                : c
            )
          )

          setCarta1(null)
          setCarta2(null)
        }, 1000)
      }
    }
  }

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 80px)", gap: "10px" }}>
        {cartas.map(carta => (
          <div
            key={carta.id}
            onClick={() => handleClick(carta)}
            style={{
              width: "80px",
              height: "80px",
              background: "#eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              cursor: "pointer"
            }}
          >
            {carta.revelada ? carta.emoji : "?"}
          </div>
        ))}
      </div>

      {/* contador embaixo */}
      <p style={{ marginTop: "20px" }}>
        Vitórias: {vitorias}
      </p>
    </div>
  )
}

export default App