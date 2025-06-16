import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeAccident(accidentData) {
  const prompt = `分析以下交通事故情況並生成詳細的事故描述、傷害分析和受傷指數：

事故資料：
- 碰撞瞬間車速：${accidentData.speed} km/h
- 碰撞角度：${accidentData.collisionAngle}
- 車輛類型：${accidentData.vehicleType}
- 人員位置：${accidentData.position}
- 安全設備：${Object.entries(accidentData.safetyEquipment)
    .filter(([_, value]) => value)
    .map(([key]) => key === 'seatbelt' ? '安全帶' : '安全氣囊')
    .join('、')}
- 天氣狀況：${accidentData.weather}
- 路況：${accidentData.roadCondition}
${accidentData.additionalNotes ? `- 補充說明：${accidentData.additionalNotes}` : ''}
  
請根據以上資訊提供：
1. 詳細的事故描述
2. 傷害原因分析
3. 各部位受傷指數評估（0-100分，0代表無傷，100代表極重傷）：
   - 頭部
   - 左上臂
   - 左前臂
   - 左手
   - 右上臂
   - 右前臂
   - 右手
   - 胸部
   - 脊椎
   - 骨盆
   - 左大腿
   - 左小腿
   - 左腳
   - 右大腿
   - 右小腿
   - 右腳

請以 JSON 格式輸出，包含以下欄位：
{
  "accident_description": "事故描述文字",
  "injury_analysis": "傷害分析文字",
  "injury_scores": {
    "head": 0-100數值,
    "left_upper_arm": 0-100數值,
    ...其他部位
  }
}`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "你是一個專業的交通事故傷害分析專家，擅長根據事故情況分析可能的傷害程度。",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-4-1106-preview",
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0].message.content;
    return JSON.parse(response);
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('分析過程發生錯誤，請稍後再試');
  }
}
