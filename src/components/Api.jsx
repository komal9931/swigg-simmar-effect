import React, { useEffect, useState } from "react";

const Api = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.0323307&lng=72.5620768&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    )
      .then((response) => response.json())
      .then((data) => {
        const list =
          data?.data?.cards?.[2]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants || [];
        setRestaurants(list);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="shimmer-container">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="shimmer-card"></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1>Restaurants</h1>
      <ul>
        {restaurants.map((restaurant, index) => (
          <li key={index} className="restaurant-card">
            <h3>{restaurant.info.name}</h3>
            <p>{restaurant.info.cuisines.join(", ")}</p>
            <p>⭐ {restaurant.info.avgRating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Api;

// import React, { useEffect, useState } from "react";

// const Api = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(
//       "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.0323307&lng=72.5620768&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         const list =
//           data?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle
//             ?.restaurants || [];
//         setRestaurants(list);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Restaurants</h1>

//       {loading ? (
//         <div className="shimmer-container">
//           {[...Array(5)].map((_, index) => (
//             <div key={index} className="shimmer-card"></div>
//           ))}
//         </div>
//       ) : (
//         <ul>
//           {restaurants.map((restaurant, index) => (
//             <li key={index} className="restaurant-card">
//               <h3>{restaurant.info.name}</h3>
//               <p>{restaurant.info.cuisines.join(", ")}</p>
//               <p>⭐ {restaurant.info.avgRating}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Api;
