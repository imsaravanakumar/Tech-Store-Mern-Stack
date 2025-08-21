// src/pages/NewArrivals.jsx
import React from "react";
import ProductDetails from "../components/Products/ProductDetails";
import ProductCard from "../components/Layout/ProductsCard";

const NewArrivals = () => {
  const newLaptops = ProductDetails.Laptops.slice(0, 4);
  const newWatches = ProductDetails.Watches.slice(0, 4);
  const newPhones = ProductDetails.Phones.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-6">
      
      <div className="border-b-8 border-amber-400 w-80 mb-10 mx-auto">
       <h1 className="text-4xl font-extrabold text-center">
        New Arrivals
      </h1> 
      </div>
      

      {/* Section Component */}
      {[
        { title: "Latest Laptops", items: newLaptops },
        { title: "Latest Watches", items: newWatches },
        { title: "Latest Phones", items: newPhones },
      ].map((section, index) => (
        <section key={index} className="mb-14">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-3">
            {section.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {section.items.map((product) => (
              <div
                key={product.id}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default NewArrivals;
