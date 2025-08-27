"use client";

import { Bar, BarChart, Cell, LabelList, XAxis, YAxis } from "recharts";
import { Review } from "@/types/index";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export const description = "A horizontal bar chart";

export default function DoctorRatingChart({ reviews }: { reviews: Review[] }) {
  const ratingStats = {
    awesome: 0,
    great: 0,
    good: 0,
    okay: 0,
    bad: 0,
  };
  let approval = 0;
  reviews.forEach((review) => {
    switch (review.ratings.overall) {
      case 1:
        ratingStats.bad++;
        break;
      case 2:
        ratingStats.okay++;
        break;
      case 3:
        ratingStats.good++;
        approval++;
        break;
      case 4:
        ratingStats.great++;
        approval++;
        break;
      case 5:
        ratingStats.awesome++;
        approval++;
        break;
    }
  });
  const chartData = [
    { review: "Awesome", desktop: ratingStats.awesome },
    { review: "Great", desktop: ratingStats.great },
    { review: "Good", desktop: ratingStats.good },
    { review: "Okay", desktop: ratingStats.okay },
    { review: "Awful", desktop: ratingStats.bad },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;
  return (
    <Card className="bg-gray-100 size-full ">
      <CardHeader>
        <CardTitle className="text-3xl">Rating Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 30,
              right: 30,
            }}
          >
            <XAxis type="number" dataKey="desktop" hide />
            <YAxis
              dataKey="review"
              type="category"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              className="text-base font-bold"
              tickFormatter={(value) => value}
            />

            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="var(--color-desktop)" />
              ))}
              <LabelList
                className="text-base font-bold"
                dataKey={"desktop"}
                position={"right"}
                offset={8}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex flex-col items-center w-full">
          <div className="text-3xl font-bold text-blue-600">
            {reviews.length > 0
              ? Math.round((approval / reviews.length) * 100)
              : 0}
            %
          </div>
          <div className="text-gray-600">
            Approval Rate ({approval} out of {reviews.length} patients recommend
            this doctor)
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
