'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InjuryResults({ results = null }) {
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
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>事故描述</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{results.accident_description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>傷害分析</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{results.injury_analysis}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>受傷指數詳情</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(results.injury_scores).map(([part, score]) => (
              <div key={part} className="flex justify-between">
                <span className="capitalize">{part.replace(/_/g, ' ')}</span>
                <span className={`font-bold ${score > 60 ? 'text-red-500' : score > 30 ? 'text-orange-500' : 'text-green-500'}`}>
                  {score}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
