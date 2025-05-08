import foodModel from "../models/foodModel.js"
import userModel from "../models/userModel.js"

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId)
    let cartData = await userData.cartData
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1
    } else {
      cartData[req.body.itemId] += 1
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData })
    res.json({ success: true, message: "Cart added successfully" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "error adding cart" })
  }
}

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId)
    let cartData = await userData.cartData
    if (cartData[req.body.itemId]) {
      cartData[req.body.itemId] -= 1
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId]
      }
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData })
    res.json({ success: true, message: "Cart removed successfully" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "error removing cart" })
  }
}

// const getTotalCartAmmount = async (req, res) => {
//   try {
//     const userData = await userModel.findById(req.body.userId)

//     const cartData = userData.cartData || {}
//     const cartKeys = Object.keys(cartData)

//     const validFoodItems = await foodModel.find({ _id: { $in: cartKeys } })
//     console.log(validFoodItems)
//     const validCartData = {}
//     validFoodItems.forEach((food) => {
//       validCartData[food._id] = cartData[food._id]
//     })

//     // If cartData is modified, update the user document
//     if (cartKeys.length !== Object.keys(validCartData).length) {
//       await userModel.findByIdAndUpdate(req.body.userId, {
//         cartData: validCartData,
//       })
//     }

//     res.json({ success: true, cartData: validCartData })

//   } catch (error) {
//     console.error(error)
//     res.json({ success: false, message: "Error getting total cart amount" })
//   }
// }

const getTotalCartAmmount = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId)

    const cartData = userData.cartData || {}
    const cartKeys = Object.keys(cartData)

    const validFoodItems = await foodModel.find({ _id: { $in: cartKeys } })
    const validCartData = {}
    validFoodItems.forEach((food) => {
      validCartData[food._id] = cartData[food._id]
    })


    // If cartData is modified, update the user document
    if (cartKeys.length !== Object.keys(validCartData).length) {
      await userModel.findByIdAndUpdate(req.body.userId, {
        cartData: validCartData,
      })
    }


    res.json({ success: true, data: { validCartData, validFoodItems } })
  } catch (error) {
    res.json({ success: false, message: "Error getting total cart amount" })
  }
}

export { addToCart, removeFromCart, getTotalCartAmmount }
