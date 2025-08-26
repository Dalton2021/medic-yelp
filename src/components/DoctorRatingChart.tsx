"use client";
import doctor from "@/data/doctors.json";
import { Bar, BarChart, Cell, LabelList, XAxis, YAxis } from "recharts";
import { Doctor } from "@/types/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export const description = "A horizontal bar chart";

const chartData = [
  { review: "Awesome", desktop: 11 },
  { review: "Great", desktop: 7 },
  { review: "Good", desktop: 8 },
  { review: "Okay", desktop: 2 },
  { review: "Awful", desktop: 8 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export default function DoctorRatingChart() {
  return (
    <Card className="bg-gray-50">
      <CardHeader>
        <CardTitle className="text-3xl">Rating Distribution</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
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
        Approval rating goes here
      </CardFooter>
    </Card>
  );
}
