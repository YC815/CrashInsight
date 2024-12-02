import Image from "next/image";
import AccidentForm from './components/AccidentForm';
import HumanBodyVisualization from './components/HumanBodyVisualization';
import InjuryResults from './components/InjuryResults';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          交通事故傷害評估工具
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 左側：輸入表單 */}
          <div className="space-y-6 p-6 border rounded-lg">
            <AccidentForm />
          </div>
          
          {/* 右側：人體圖和結果顯示 */}
          <div className="space-y-6 p-6 border rounded-lg">
            <HumanBodyVisualization />
            <InjuryResults />
          </div>
        </div>
      </div>
    </div>
  );
}
