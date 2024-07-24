import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "../../../component/v0/card"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "../../../component/v0/chart"
import { CartesianGrid, XAxis, Line, LineChart } from "recharts"
import Postmethod from "../../../http/Post_method";

interface LinechartChartProps {
    channelId: string;
}
  interface ChannelData {
    Eigth_day_Ago: string;
    Eigthteen_day_Ago: string;
    Eleven_day_Ago: string;
    Five_day_Ago: string;
    Four_day_Ago: string;
    Nine_day_Ago: string;
    Nineteen_day_Ago: string;
    One_day_Ago: string;
    Seven_day_Ago: string;
    Six_day_Ago: string;
    Ten_day_Ago: string;
    Three_day_Ago: string;
    Today: string;
    Twenty_day_Ago: string;
    Twenty_eigth_day_Ago: string;
    Twenty_five_day_Ago: string;
    Twenty_four_day_Ago: string;
    Twenty_nine_day_Ago: string;
    Twenty_one_day_Ago: string;
    Twenty_seven_day_Ago: string;
    Twenty_six_day_Ago: string;
    Twenty_three_day_Ago: string;
    Twenty_two_day_Ago: string;
    Two_day_Ago: string;
    channelId: number;
    fifteen_day_Ago: string;
    fourteen_day_Ago: string;
    id: number;
    seventeen_day_Ago: string;
    sixteen_day_Ago: string;
    thirteen_day_Ago: string;
    twelve_day_Ago: string;
  }

export default function SubcriberChart(props : LinechartChartProps){
    return (
        <div className="h-full w-full max-w-2xl">
                <CardHeader>
                  <CardTitle style={{ fontSize: "1rem" }}>구독자 변화율(일)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LinechartChart channelId={props.channelId} />
                </CardContent>
              </div>
    )
}

function LinechartChart({ channelId }: LinechartChartProps) {

    const [subscriberCount, setsubscriberCount] = useState<ChannelData>();
    useEffect(() => {
      const fetchData = async () => {
        const response = await Postmethod(`${process.env.REACT_APP_BACKEND_API}/ranking/Totalsubcriberincrease`, { channelId: channelId })

        setsubscriberCount(response.subscribers)
   
      }
      fetchData();
  
  
    }, [channelId])
    return (
      <div >
        <ChartContainer
          config={{
            desktop: {
              label: "Desktop",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <LineChart
       
            accessibilityLayer
            data={[
              { desktop: subscriberCount?.Six_day_Ago },
              { desktop: subscriberCount?.Five_day_Ago },
              { desktop: subscriberCount?.Four_day_Ago },
              { desktop: subscriberCount?.Three_day_Ago },
              { desktop: subscriberCount?.Two_day_Ago },
              { desktop: subscriberCount?.Today },
            ]}
            margin={{
                top: 20, right: 30, left: 20, bottom: 20,
              }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </div>
  
    )
  }
  