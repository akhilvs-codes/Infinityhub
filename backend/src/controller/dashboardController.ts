import { Request, Response } from "express"
import record from "@/src/model/record"



export const getDashboard = async (req: Request, res: Response) => {

    try {
        let { fromDate, toDate, status, category } = req.query

        const now = new Date()
        if (!fromDate || !toDate) {
            fromDate = new Date(now.getFullYear(), now.getMonth(), 1)
            toDate = now
        }

        let mathStage = {
            createdAt: {
                $gte: new Date(fromDate),
                $lte: new Date(toDate)
            }
        }

        if (status) {
            mathStage.status = status
        }
        if (category) {
            mathStage.category = category
        }

        const aggregatePipe = [
            { $match: mathStage },
            {
                $facet: {
                    summary: [
                        {
                            $group: {
                                _id: null,
                                total: { $sum: 1 }
                            }
                        }
                    ],
                    statusDistribution: [
                        {
                            $group: {
                                _id: "$status",
                                count: { $sum: 1 }
                            }
                        },
                        { $sort: { count: 1 } },
                        {
                            $project: {
                                _id: 1,
                                status:"$_id",
                                count: 1
                            }
                        }
                    ]
                }
            }
        ]

        const result = await record.aggregate(aggregatePipe);


        const data = result[0] || {};

        res.status(200).json({
            summary: data.summary?.[0] || { total: 0 },
            charts: {
                statusDistribution: data.statusDistribution || [],
            },
        });


    }
    catch (err) {
            console.log(err);
            
        res.status(500).json({message:"internal server error" });
    }


}