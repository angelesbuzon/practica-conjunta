/**
 * PRODUCT/DISH CARD used in Home.jsx
 * Design based on CardProducto (used e.g. in dishes in Category.jsx),
 * but simpler and without backend functionality
 */

export function DishCard({ name, description, price }) {
  /*
   * Obtain clean img file name (provided that img files have consistent naming)
   * handling whitespaces and special chars
   */
  
  let imgName = name.toLowerCase();

  imgName = imgName.replaceAll(" ", "");
  imgName = imgName.replaceAll("á", "a");
  imgName = imgName.replaceAll("é", "e");
  imgName = imgName.replaceAll("í", "i");
  imgName = imgName.replaceAll("ó", "o");
  imgName = imgName.replaceAll("ú", "u"); // e.g. cuscús
  imgName = imgName.replaceAll("ñ", "n"); // e.g. lasaña
  
  console.debug("imagen: " + imgName);

  const imgPath = `../src/img/${imgName}.jpg`;

  // Final card with styles:
  return (
    <article className="w-full md:w-[30%] flex flex-row md:flex-col gap-0 justify-between items-center bg-white border-1 border-gray-light w-fit rounded-2xl hover:scale-[1.1] transition-all">
      {/* Picture */}
      <div className="w-[50%] md:w-full rounded-l-2xl md:rounded-bl-none md:rounded-t-2xl">
        <img src={imgPath} className="rounded-l-2xl md:rounded-bl-none md:rounded-t-2xl max-w-full" />
      </div>
      {/* Text */}
      <div className="w-[50%] h-full md:w-full grid md:gap-4 p-4">
        {/* Header + Description */}
        <div className="flex flex-col justify-end text-center">
          <h3 className="font-bold text-2xl text-gray-dark">{name}</h3>
          <p className="text-gray-dark">{description}</p>
        </div>
        {/* Price (bottom, right) */}
        <div className="justify-self-end flex flex-col justify-end text-center md:text-right">
          <p className="font-bold text-primary text-3xl">{price} €</p>
        </div>
      </div>
    </article>
  );
}
