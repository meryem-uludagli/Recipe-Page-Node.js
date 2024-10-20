import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import api from "../api";
import { MdEdit } from "react-icons/md";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { FaClock } from "react-icons/fa";
import { PiForkKnifeFill } from "react-icons/pi";
import DeleteButton from "../components/DeleteButton";

const Detail = () => {
  const { id } = useParams();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () =>
      api.get(`/api/v1/recipes/${id}`).then((res) => res.data.found),
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center  justify-between mb-10">
        <Link to={-1} className="flex items-center gap-2 py-1">
          <IoMdArrowRoundBack />
          Geri
        </Link>

        <Link
          className="flex gap-2 items-center bg-blue-500 hover:bg-blue-600 py-1 min-w-[80px] justify-center py-2 px-4 rounded-md text-white font-semibold text-lg"
          to={`/düzenle/${data?.id}`}
        >
          {" "}
          <MdEdit />
          Düzenle
        </Link>

        <DeleteButton disabled={!data?.id} productId={data?.id} />
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error.message} refetch={refetch} />
      ) : (
        data && (
          <div>
            <h1 className="text-3xl font-bold text-red-400">
              {data.recipeName}
            </h1>

            <div className="flex gap-4 my-5">
              <span className="flex items-center justify-center bg-yellow-500 py-2 px-4 rounded-lg text-white font-semibold">
                <PiForkKnifeFill className="mr-2" />
                {data.category}
              </span>
              <span className="flex items-center justify-center bg-yellow-500 py-2 px-4 rounded-lg text-white font-semibold">
                <FaClock className="mr-2" />
                {data.recipeTime}dk
              </span>
            </div>

            <img
              className="rounded-lg max-h-[400] w-full object-cover"
              src={data.image}
              alt={data.recipeName}
            />

            <div className="my-5">
              <h2 className="text-3xl font-bold text-red-400">Malzemeler</h2>
              <ul>
                {data.ingredients.map((ingredient, index) => (
                  <li key={index} className="font-semibold text-xl">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="my-5">
              <h2 className="text-3xl font-bold text-red-400">Tarif</h2>
              <ol className="list-decimal ps-4">
                {data.instructions.map((instruction, index) => (
                  <li key={index} className="font-semibold text-xl">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            {data.servingSuggestion && (
              <div className="my-5">
                <h2 className="text-3xl font-bold text-red-400">
                  Sunum Önerisi
                </h2>
                <p className="text-lg font-semibold">
                  {data.servingSuggestion}
                </p>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Detail;
