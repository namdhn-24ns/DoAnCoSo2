import React, { useEffect, useState } from "react";
import PetsViewer from "./PetsViewer";

const Pets = () => {
  const [filter, setFilter] = useState("all");
  const [petsData, setPetsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:4000/approvedPets')
        if (!response.ok) {
          throw new Error('An error occurred')
        }
        const data = await response.json()
        setPetsData(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests();
  }, [])

  const filteredPets = petsData.filter((pet) => {
    if (filter === "all") {
      return true;
    }
    return pet.type === filter;
  });

  return (
    <>
      <div className="filter-selection">
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="Tất cả">Tất cả</option>
          <option value="Chó">Chó</option>
          <option value="Mèo">Mèo</option>
          <option value="Thỏ">Thỏ</option>
          <option value="Chim">chim</option>
          <option value="Cá">Cá</option>
          <option value="Khác">Khác</option>
        </select>
      </div>
      <div className="pet-container">
        {loading ?
          <p>...</p> : ((filteredPets.length > 0 ) ? (
            filteredPets.map((petDetail, index) => (
              <PetsViewer pet={petDetail} key={index} />
            ))
          ) : (
            <p className="oops-msg">Hiện không có thú cưng khả dụng.</p>
          )
          )
        }
      </div>
    </>
  );
};

export default Pets;
