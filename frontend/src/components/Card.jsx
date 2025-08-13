function Card({ image, title }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-[200px] h-[300px] flex justify-center items-center 
        rounded-xl bg-[#022020] border-2 border-black rounded-2xl 
        overflow-hidden cursor-pointer 
        transform transition-transform duration-300 hover:scale-105 
        hover:shadow-2xl hover:shadow-blue-500"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <p className="text-white mt-2 text-sm text-center">{title}</p>
    </div>
  );
}

export default Card;