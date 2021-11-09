import { useEffect, useState } from "react";

import { Food } from "../../components/Food";
import { Header } from "../../components/Header";
import { ModalAddFood } from "../../components/ModalAddFood/indes";
import { api } from "../../services/api";
import { Food as FoodType } from "../../types";

import { FoodsContainer } from "./styles";

export function Dashboard() {
  const [foods, setFoods] = useState<FoodType[]>([]);

  const [modalNewRecipeIsOpen, setModalNewRecipeIsOpen] = useState(false);

  useEffect(() => {
    api.get("/foods").then((response) => {
      setFoods(response.data);
    });
  }, []);

  function toggleModalNewRecipe() {
    setModalNewRecipeIsOpen(!modalNewRecipeIsOpen);
  }

  async function handleAddFood(food: FoodType) {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(foodId: number) {
    await api.delete(`/foods/${foodId}`);

    const foodsFiltered = foods.filter((food) => food.id !== foodId);

    setFoods(foodsFiltered);
  }

  return (
    <>
      <Header handleOpenModal={toggleModalNewRecipe} />

      <ModalAddFood
        isOpen={modalNewRecipeIsOpen}
        setIsOpen={toggleModalNewRecipe}
        handleAddFood={handleAddFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods.map((f) => (
          <Food
            key={f.id}
            food={f}
            handleDelete={handleDeleteFood}
            // handleEditFood={this.handleEditFood}
          />
        ))}
      </FoodsContainer>
    </>
  );
}
