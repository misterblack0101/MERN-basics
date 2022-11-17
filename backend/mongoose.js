
const productSchema = new mongoose.Schema({});
const ProductsModel = mongoose.model("products", productSchema);

const insertData = async () => {
  let data = new ProductsModel({
    name: "name1",
    price: 9987,
    brand: "sdfsdf",
  });
  let res = await data.save();
  console.log(res);
};

const updateData = async () => {
  let data = await ProductsModel.updateOne(
    { name: "name1" },
    {
      $set: {
        price: 9907,
      },
    }
  );
  console.log(data);
};

const deleteData = async () => {
  let data = await ProductsModel.deleteOne({ name: "name1" });
  console.log(data);
};

const findInDb = async (searchQuery) => {
  console.log(await ProductsModel.find(searchQuery));
};
