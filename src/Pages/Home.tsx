import { useEffect, useState } from "react";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

type PokemonIp = {
    name: string;
    url: string;
};

type ApiResponse = {
    count: number;
    next: string;
    previous: string;
    results: PokemonIp[];
};

function Home() {
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState<PokemonIp[]>([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
            .then((res) => res.json())
            .then((data: ApiResponse) => {
                setPokemon(data.results);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-slate-100 pb-20">
            <header className="bg-red-600 py-10 mb-12 shadow-lg border-b-8 border-black relative">
                <div className="text-center font-black text-white text-6xl tracking-widest drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
                    POKÉDEX
                </div>
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-white border-8 border-black rounded-full z-10 shadow-md"></div>
            </header>

            <div className="max-w-6xl mx-auto px-4">
                {loading ? (
                    <div className="text-center text-2xl font-bold animate-pulse mt-20 text-slate-500">
                        Searching for Pokemon...
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                        {pokemon.map((item, index) => {
                            const pokemonId = index + 1;
                            return (
                                <Link
                                    to={`/detail/${pokemonId}`}
                                    key={index}
                                    className="group no-underline"
                                >
                                    <div className={twMerge(
                                        "relative bg-white border-4 border-slate-800 rounded-2xl p-4 transition-all duration-300",
                                        "hover:-translate-y-3 hover:shadow-[0_20px_0px_-5px_rgba(0,0,0,0.1)] hover:border-yellow-400",
                                        "flex flex-col items-center"
                                    )}>
                                        <span className="absolute top-2 left-3 font-mono font-bold text-slate-300 group-hover:text-yellow-500">
                                            #{String(pokemonId).padStart(3, '0')}
                                        </span>

                                        <div className="bg-slate-50 rounded-full mb-4 group-hover:bg-yellow-50 transition-colors duration-300">
                                            <img
                                                className="w-32 h-32 object-contain"
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                                                alt={item.name}
                                            />
                                        </div>

                                        <div className="capitalize font-black text-lg text-slate-700 group-hover:text-black">
                                            {item.name}
                                        </div>

                                        <div className="w-full h-1 bg-slate-100 mt-3 rounded-full overflow-hidden">
                                            <div className="w-1/2 h-full bg-red-500 group-hover:w-full transition-all duration-500"></div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;