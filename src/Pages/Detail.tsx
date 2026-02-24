import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

type PokemonData = {
    name: string;
    id: number;
    height: number;
    weight: number;
    types: { type: { name: string } }[];
};

function Detail() {
    const [pokemonDetail, setPokemonDetail] = useState<PokemonData | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPokemonDetail(data);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
            </div>
        );
    }

    if (!pokemonDetail) {
        return <div className="p-10 text-center font-bold">Pokemon Not Found!</div>;
    }

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4">
            {/* 뒤로가기 버튼 */}
            <button
                onClick={() => navigate(-1)}
                className="mb-8 mx-auto block bg-slate-800 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600 transition-colors"
            >
                ← Back to List
            </button>

            {/* 도감(Pokedex) 케이스 컨테이너 */}
            <div className="max-w-md mx-auto bg-red-600 rounded-[30px] border-8 border-slate-900 shadow-2xl overflow-hidden relative">

                {/* 상단 장식용 램프 */}
                <div className="bg-red-700 p-4 border-b-4 border-slate-900 flex gap-2">
                    <div className="w-10 h-10 bg-blue-400 border-4 border-white rounded-full shadow-inner shadow-blue-600"></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full border border-black"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full border border-black"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full border border-black"></div>
                </div>

                {/* 메인 화면 영역 */}
                <div className="p-6">
                    <div className="bg-slate-200 border-8 border-slate-800 rounded-xl p-4 shadow-inner text-slate-800">

                        {/* 이미지 박스 */}
                        <div className="bg-white rounded-lg border-4 border-slate-400 mb-4 flex justify-center items-center p-4 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#000_10%,_transparent_10%)] bg-[length:10px_10px]"></div>
                            <img
                                className="w-56 h-56 object-contain relative z-10 drop-shadow-xl"
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                                alt={pokemonDetail.name}
                            />
                        </div>

                        {/* 포켓몬 정보 영역 */}
                        <div className="font-mono space-y-2">
                            <div className="flex justify-between items-center border-b-2 border-slate-400 pb-1">
                                <span className="font-bold text-slate-500 text-sm">NO.</span>
                                <span className="text-xl font-black">#{String(pokemonDetail.id).padStart(3, '0')}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-500 text-sm">NAME</span>
                                <span className="text-2xl font-black capitalize italic">{pokemonDetail.name}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4 bg-slate-300 p-3 rounded-lg">
                                <div className="text-center border-r border-slate-400">
                                    <div className="text-[10px] font-bold text-slate-600">HEIGHT</div>
                                    <div className="font-black text-lg">{pokemonDetail.height / 10}m</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[10px] font-bold text-slate-600">WEIGHT</div>
                                    <div className="font-black text-lg">{pokemonDetail.weight ? pokemonDetail.weight / 10 : '??'}kg</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 하단 컨트롤 버튼 디자인 */}
                <div className="px-6 pb-8 flex justify-between items-center">
                    <div className="w-12 h-12 bg-slate-900 rounded-full border-4 border-slate-700 flex items-center justify-center">
                        <div className="w-8 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-10 h-2 bg-slate-800 rounded-full"></div>
                        <div className="w-10 h-2 bg-slate-800 rounded-full"></div>
                    </div>
                    <div className="w-14 h-14 bg-green-500 border-4 border-slate-900 rounded-lg shadow-lg"></div>
                </div>
            </div>
        </div>
    );
}

export default Detail;