import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api";
import { toast } from "react-toastify";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["recipe"],
    queryFn: () =>
      api.get(`/api/v1/recipes/${id}`).then((res) => res.data.found),
  });
  const { isLoading, mutate } = useMutation({
    mutationFn: (updatedData) =>
      api.patch(`/api/v1/recipes/${id}`, updatedData),

    onSuccess: () => {
      toast.success("Güncelleme Başarılı");

      navigate(`/`);
    },

    onError: () => {
      toast.error(`Bir şeyler ters gitti`);
    },
  });

  return (
    <div>
      <div>
        <h1 className="text-red-400 text-3xl font-bold">Tarifi Düzenle</h1>
        <Form isLoading={isLoading} mutate={mutate} recipeData={data} />
      </div>
    </div>
  );
};

export default Update;
