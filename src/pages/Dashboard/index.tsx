import { useEffect, useState } from "react";

import { Food } from "../../components/Food";
import { Header } from "../../components/Header";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { api } from "../../services/api";
import { Food as TFood } from "../../types";

import { FoodsContainer } from "./styles";

export function Dashboard() {
  const [foods, setFoods] = useState<TFood[]>([]);
  const [editingFood, setEditingFood] = useState<TFood>({} as TFood);

  const [modalNewFoodIsOpen, setModalNewFoodIsOpen] = useState(false);
  const [modalEditFoodIsOpen, setModalEditFoodIsOpen] = useState(false);

  useEffect(() => {
    api.get("/foods").then((response) => {
      setFoods(response.data);
    });
  }, []);

  function toggleModalNewFood() {
    setModalNewFoodIsOpen(!modalNewFoodIsOpen);
  }

  function toggleModalEditFood() {
    setModalEditFoodIsOpen(!modalEditFoodIsOpen);
  }

  function handleEditFood(food: TFood) {
    setEditingFood(food);
    toggleModalEditFood();
  }

  async function handleAddFood(food: TFood) {
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

  async function handleUpdateFood(food: TFood) {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFoods(foodsUpdated);
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
      <Header handleOpenModal={toggleModalNewFood} />

      <ModalAddFood
        isOpen={modalNewFoodIsOpen}
        setIsOpen={toggleModalNewFood}
        handleAddFood={handleAddFood}
      />

      <ModalEditFood
        isOpen={modalEditFoodIsOpen}
        setIsOpen={toggleModalEditFood}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods.map((f) => (
          <Food
            key={f.id}
            food={f}
            handleDelete={handleDeleteFood}
            handleEditFood={handleEditFood}
          />
        ))}
      </FoodsContainer>
    </>
  );
}
