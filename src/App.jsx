import {useState, useEffect} from "react";

export default function App(){

  const [id, setId] = useState(1);
  const [pokemon, setPokemon] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() =>{
    async function buscarPokemon() {
      setCarregando(true);

      try{
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const dados = await resposta.json();
        setPokemon(dados)
        
      } catch (erro){
        console.error("Erro ao buscar pokemon", erro);
        setPokemon(null);

      } finally {
        setCarregando(false);
      }
    }
    buscarPokemon();
  }, [id]);

  return(

    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">

        <h1 className="text-3xl font-bold text-slate-800 mb-6">Pokédex</h1>
        {carregando ? (<p>Carregando...</p>) : pokemon ? (

        <>
          <div className="bg-slate-100 rounded-xl p-4 mb-4">
            <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-50 h-50 mx-auto"/>
          </div>
          <p className="mb-4 text-gray-500">#{pokemon.id}</p>
          <h2 className="text-2xl font-bold capitalize mb-4">{pokemon.name}</h2>

          <div className="flex justify-center gap-2 mb-6">
            {pokemon.types.map((tipo) => (
              <span
              key={tipo.type.name}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm capitalize">
                {tipo.type.name}
              </span>
            ))}
          </div>
        </>

      ) : (<p className="mb-6">Não foi possível carregar</p>)}

        <div className="flex gap-3">

          <button
          onClick={() => setId(id - 1)}
          disabled={id === 1}
          className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-40 px-4 py-2 rounded-lg font-medium cursor-pointer disabled:cursor-not-allowed">
            Anterior
          </button>

          <button
          onClick={() => setId(id + 1)}
            disabled={id === 1025}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
            Avançar
          </button>

        </div>
      </div>
    </div>
  )

}