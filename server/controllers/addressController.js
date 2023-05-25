const AddressModel = require("../models/AddressModel");

const addAdress = async (req, res) => {
  try {
    const { region, district, street, house, standart } = req.body;
    if ((!region || !district || !street, !house)) {
      return res.status(500).json({ err: "Please add all the feilds!!!" });
    }
    const address = await AddressModel.create({
      region,
      street,
      district,
      house,
      user: req.user.id,
    });
    await address.save();

    res.status(200).json({ msg: "Created!", address });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const myAddresses = async (req, res) => {
  try {
    const addresses = await AddressModel.find({ user: req.user.id });
    res.status(200).json({ msg: "Success", addresses });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const standardizationAddress = async (req, res) => {
  try {
    let myAddresses = await AddressModel.find({ user: req.user.id });
    if (!myAddresses) {
      return res.status(404).json({ err: "Not Found!" });
    }
    let standartedAddress = await AddressModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        standart: true,
      },
      { new: true }
    );
    const anotherAddresses = myAddresses.filter((item) => {
      return item._id.toString() !== standartedAddress._id.toString();
    });
    await anotherAddresses.forEach((item) => {
      AddressModel.findByIdAndUpdate(
        item._id,
        { standart: false },
        { new: true },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Success");
          }
        }
      );
    });

    const addresses = await AddressModel.find({ user: req.user.id });
    standartedAddress = addresses.find((addrs) => addrs.standart == true);
    res.status(200).json({
      msg: "Successfully!",
      addresses,
      standartedAddress,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const address = await AddressModel.findByIdAndDelete(req.params.id);
    const myAddresses = await AddressModel.find({ user: req.user.id });
    const anotherAddresses = myAddresses.filter((item) => {
      return item._id.toString() !== address._id.toString();
    });
    await AddressModel.findOneAndUpdate(
      { _id: anotherAddresses[0]._id },
      {
        standart: true,
      },
      { new: true }
    );
    const newAddresses = await AddressModel.find({ user: req.user.id });
    const addresses = newAddresses.filter((item) => {
      return item._id.toString() !== address._id.toString();
    });
    console.log(addresses);
    res.status(200).json({ msg: "Success", addresses });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

module.exports = {
  addAdress,
  myAddresses,
  standardizationAddress,
  deleteAddress,
};
