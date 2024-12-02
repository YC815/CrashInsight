'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export default function AccidentForm() {
  const [formData, setFormData] = useState({
    speed: '',
    collisionAngle: '',
    vehicleType: '',
    position: '',
    safetyEquipment: {
      seatbelt: false,
      airbag: false,
    },
    weather: '',
    roadCondition: '',
    additionalNotes: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: 實作 API 呼叫
    console.log(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name) => {
    setFormData(prev => ({
      ...prev,
      safetyEquipment: {
        ...prev.safetyEquipment,
        [name]: !prev.safetyEquipment[name]
      }
    }));
  };

  return (
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
                onCheckedChange={() => handleCheckboxChange('seatbelt')}
              />
              <Label htmlFor="seatbelt">安全帶</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="airbag"
                checked={formData.safetyEquipment.airbag}
                onCheckedChange={() => handleCheckboxChange('airbag')}
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
  );
}
