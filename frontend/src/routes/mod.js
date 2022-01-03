import { FaRegTrashAlt, FaEdit, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";

export default function Mod() {
  let [list, setList] = useState([
    {
      id: "014747ee-2784-44ef-8887-88f381e3baay",
      date: "2021-14-12",
      description: "Tiskaa",
      tag: "kotityöt",
    },
  ]);
  //Edits task description and adds modified task to the end of the list
  function handleEdit(e) {
    let edited = window.prompt("Edit description");
    let editedItem = {
      id: uuidv4(),
      description: edited,
      date: e.date,
      tag: e.tag,
    };
    const newList = list.filter((el) => el.id !== e.id);
    setList([...newList, editedItem]);
  }

  //Filters element from list by comparing id's
  function handleDelete(e) {
    setList(list.filter((el) => el.id !== e.id));
  }
  return (
    <main>
      <h1>MODERATION</h1>
      <div class="info-box">
        <h2>Tekijä:</h2>
        <p>Hilla Härkönen</p>
        <h2>Käyttöohjeet:</h2>
        <p>
          Aloitusnäkymässä on mahdollista valita haluamansa sivu. Todo-sivu
          toimii seuraavalla tavalla:
        </p>
        <span id="buttons">
          {/* DELETE BUTTON */}
          <button id="taskBtn">
            <FaRegTrashAlt onClick={() => handleDelete()} />
          </button>

          {/* EDIT BUTTON */}
          <button id="taskBtn">
            <FaEdit onClick={() => handleEdit()} />
          </button>
        </span>
      </div>
    </main>
  );
}
