import { getProducts } from "@/actions/getProducts";
import { CiCirclePlus } from "react-icons/ci";

const BookingPage = async ({ params }: any) => {
  let { id } = params;
  const business = await getProducts(id);

  return (
    <main>
      <h1 className="text-center text-xl font-bold mt-4">{business?.name}</h1>
      <div className="flex flex-col gap-4 mx-3  mt-5">
        {business?.products.map((product: any) => (
          <div
            key={product.id}
            className="flex gap-2 border items-center justify-between px-5 py-2"
          >
            <div className="flex gap-2 items-center">
              <h2>{product.name}</h2>
              <p className="text-sm">({product.price} TL)</p>
            </div>{" "}
            <CiCirclePlus />
          </div>
        ))}
      </div>
    </main>
  );
};

export default BookingPage;
