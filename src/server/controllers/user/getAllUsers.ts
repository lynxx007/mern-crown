import User from "../../models/UserModel";
import expressAsyncHandler from "express-async-handler";

const getAllUsers = expressAsyncHandler(async (req, res) => {
  const pageNumber = Number(req.query.pageNumber) || 1;

  const count = await User.countDocuments();

  const users = await User.find()
    .select("-refreshToken")
    .limit(10)
    .skip(10 * (pageNumber - 1))
    .lean();

  const howManyUsersHasBeenCreatedInAMonth = await User.aggregate([
    {
      $group: {
        _id: {
          month: {
            $month: "$createdAt",
          },
          year: {
            $year: "$createdAt",
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  res.json({
    success: true,
    count,
    numberOfPages: Math.ceil(count / 10),
    users,
    howManyUsersHasBeenCreatedInAMonth,
  });
});
export default getAllUsers;
