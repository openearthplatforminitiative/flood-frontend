import { NextRequest, NextResponse } from "next/server";
import { cropHealthClient } from "@/lib/openepi-clients";

export async function POST(req: NextRequest): Promise<Response>{
  const blob = await req.blob();
  console.log(blob)

  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return cropHealthClient.getSingleHLTPrediction(buffer).then((result) => {
    const { data, error } = result;
    if (error) {
      return NextResponse.json({ status: "fail", data: error });
    } else {
      console.log(data);
      return NextResponse.json({ status: "success", data: data });
    }
  });
}