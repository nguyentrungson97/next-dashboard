"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { supabase } from "@/app/api/supabase/connect";
import { useState, useEffect } from "react";

export default function Home() {
  const [dataTable, setDataTable] = useState([]);
  const getData = async () => {
    const { data, error } = await supabase.from("affiliate").select();
    if (error) {
      console.log(error);
    }
    setDataTable(data.sort((a, b) => a.order - b.order));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container">
      <header className="header">
        <div className="container">
          <div className="logo">
            <img src="https://via.placeholder.com/50" alt="Logo" />
            <span className="title">Tài chính duyệt nhanh</span>
          </div>
        </div>
      </header>
      <ul className="responsive-list">
        {dataTable.map((item) => (
          <li
            className="list-item"
            onClick={() => window.open(item.url, "_blank")}
          >
            <div className="item-image">
              <img src={item.image} alt="Placeholder Image" />
            </div>
            <div className="item-content">
              <h3>{item.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
