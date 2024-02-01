import expressAsyncHandler from "express-async-handler";
import { stripeConfig } from "../../config/stripe";
import { format } from "date-fns";

const getTotalAmountPaid = expressAsyncHandler(async (req, res) => {
  const chargeAll = await stripeConfig.charges.list({});

  let totalAll = 0;
  const paymentByMonth: Array<{ month: string; total: number }> = [];

  chargeAll.data.forEach((charge) => {
    const date = new Date(charge.created * 1000);
    const month = format(date, "yyyy-MM");
    totalAll += Number(charge.amount) / 100;

    let monthData = paymentByMonth.find((item) => item.month === month);
    if (!monthData) {
      monthData = { month: month, total: 0 };
      paymentByMonth.push(monthData);
    }
    monthData.total += Number(charge.amount) / 100;
  });

  res.json({ totalAll: totalAll, totalByMonth: paymentByMonth });
});

export default getTotalAmountPaid;
