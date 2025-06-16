"use client";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Home() {
  const [results, setResults] = useState(null);
  const [formData, setFormData] = useState({
    speed: "",
    collisionAngle: "",
    vehicleType: "",
    position: "",
    safetyEquipment: {
      seatbelt: false,
      airbag: false,
    },
    weather: "",
    roadCondition: "",
    additionalNotes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 假設你有一個 API 來處理表單資料
    try {
      const response = await fetch("/api/analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResults(data); // 設置返回的結果
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name) => {
    setFormData((prev) => ({
      ...prev,
      safetyEquipment: {
        ...prev.safetyEquipment,
        [name]: !prev.safetyEquipment[name],
      },
    }));
  };

  const getColor = (score = 0) => {
    if (score === 0) return "bg-green-200";
    if (score < 30) return "bg-purple-200";
    if (score < 60) return "bg-orange-200";
    return "bg-red-200";
  };

  if (!results) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>分析結果</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            請填寫並提交表單以獲取分析結果
          </p>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          交通事故傷害評估工具
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 左側：輸入表單 */}
          <div className="space-y-6 p-6 border rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="speed">碰撞瞬間車速 (km/h)</Label>
                  <Input
                    id="speed"
                    name="speed"
                    type="number"
                    value={formData.speed}
                    onChange={handleInputChange}
                    placeholder="例如：60"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="collisionAngle">碰撞角度敘述</Label>
                  <Input
                    id="collisionAngle"
                    name="collisionAngle"
                    value={formData.collisionAngle}
                    onChange={handleInputChange}
                    placeholder="例如：正面撞擊"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="vehicleType">車輛外型敘述</Label>
                  <Input
                    id="vehicleType"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    placeholder="例如：中型轎車"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="position">分析人員位置</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="例如：駕駛座"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>使用的安全設備</Label>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="seatbelt"
                        checked={formData.safetyEquipment.seatbelt}
                        onCheckedChange={() => handleCheckboxChange("seatbelt")}
                      />
                      <Label htmlFor="seatbelt">安全帶</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="airbag"
                        checked={formData.safetyEquipment.airbag}
                        onCheckedChange={() => handleCheckboxChange("airbag")}
                      />
                      <Label htmlFor="airbag">安全氣囊</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="weather">天氣狀況</Label>
                  <Input
                    id="weather"
                    name="weather"
                    value={formData.weather}
                    onChange={handleInputChange}
                    placeholder="例如：晴天"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="roadCondition">路況狀況</Label>
                  <Input
                    id="roadCondition"
                    name="roadCondition"
                    value={formData.roadCondition}
                    onChange={handleInputChange}
                    placeholder="例如：濕滑路面"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="additionalNotes">其他補充說明</Label>
                  <Textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    placeholder="例如：車輛翻覆"
                    className="h-20"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                生成分析結果
              </Button>
            </form>
          </div>

          {/* 右側：人體圖和結果顯示 */}
          <div className="space-y-6 p-6 border rounded-lg">
            <div className="relative w-full aspect-[2/3] max-w-sm mx-auto">
              {/* 人體輪廓 - 簡化版本 */}
              <div className="absolute inset-0 flex flex-col items-center">
                {/* 頭部 */}
                <div
                  className={`w-16 h-16 rounded-full ${getColor(
                    injuryScores.head
                  )} mb-2`}
                />

                {/* 軀幹 */}
                <div className="flex">
                  {/* 左臂 */}
                  <div className="flex flex-col items-center mr-2">
                    <div
                      className={`w-8 h-12 rounded ${getColor(
                        injuryScores.left_upper_arm
                      )} mb-1`}
                    />
                    <div
                      className={`w-8 h-12 rounded ${getColor(
                        injuryScores.left_forearm
                      )} mb-1`}
                    />
                    <div
                      className={`w-8 h-8 rounded ${getColor(
                        injuryScores.left_hand
                      )}`}
                    />
                  </div>

                  {/* 胸部和脊椎 */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-20 h-24 rounded ${getColor(
                        injuryScores.chest
                      )} mb-1`}
                    />
                    <div
                      className={`w-20 h-12 rounded ${getColor(
                        injuryScores.spine
                      )} mb-1`}
                    />
                    <div
                      className={`w-20 h-12 rounded ${getColor(
                        injuryScores.pelvis
                      )}`}
                    />
                  </div>

                  {/* 右臂 */}
                  <div className="flex flex-col items-center ml-2">
                    <div
                      className={`w-8 h-12 rounded ${getColor(
                        injuryScores.right_upper_arm
                      )} mb-1`}
                    />
                    <div
                      className={`w-8 h-12 rounded ${getColor(
                        injuryScores.right_forearm
                      )} mb-1`}
                    />
                    <div
                      className={`w-8 h-8 rounded ${getColor(
                        injuryScores.right_hand
                      )}`}
                    />
                  </div>
                </div>

                {/* 腿部 */}
                <div className="flex mt-2">
                  {/* 左腿 */}
                  <div className="flex flex-col items-center mr-2">
                    <div
                      className={`w-8 h-16 rounded ${getColor(
                        injuryScores.left_thigh
                      )} mb-1`}
                    />
                    <div
                      className={`w-8 h-12 rounded ${getColor(
                        injuryScores.left_lower_leg
                      )} mb-1`}
                    />
                    <div
                      className={`w-8 h-8 rounded ${getColor(
                        injuryScores.left_foot
                      )}`}
                    />
                  </div>

                  {/* 右腿 */}
                  <div className="flex flex-col items-center ml-2">
                    <div
                      className={`w-8 h-16 rounded ${getColor(
                        injuryScores.right_thigh
                      )} mb-1`}
                    />
                    <div
                      className={`w-8 h-12 rounded ${getColor(
                        injuryScores.right_lower_leg
                      )} mb-1`}
                    />
                    <div
                      className={`w-8 h-8 rounded ${getColor(
                        injuryScores.right_foot
                      )}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 結果區 */}
            <Card>
              <CardHeader>
                <CardTitle>傷害評估結果</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  頭部傷害風險: <span>{results.head}</span>
                </p>
                <p>
                  頸部傷害風險: <span>{results.neck}</span>
                </p>
                {/* 在這裡添加更多傷害分數展示 */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
