'use client';

export default function HumanBodyVisualization({ injuryScores = {} }) {
  // 將傷害指數轉換為顏色
  const getColor = (score = 0) => {
    if (score === 0) return 'bg-green-200';
    if (score < 30) return 'bg-purple-200';
    if (score < 60) return 'bg-orange-200';
    return 'bg-red-200';
  };

  return (
    <div className="relative w-full aspect-[2/3] max-w-sm mx-auto">
      {/* 人體輪廓 - 簡化版本 */}
      <div className="absolute inset-0 flex flex-col items-center">
        {/* 頭部 */}
        <div className={`w-16 h-16 rounded-full ${getColor(injuryScores.head)} mb-2`} />
        
        {/* 軀幹 */}
        <div className="flex">
          {/* 左臂 */}
          <div className="flex flex-col items-center mr-2">
            <div className={`w-8 h-12 rounded ${getColor(injuryScores.left_upper_arm)} mb-1`} />
            <div className={`w-8 h-12 rounded ${getColor(injuryScores.left_forearm)} mb-1`} />
            <div className={`w-8 h-8 rounded ${getColor(injuryScores.left_hand)}`} />
          </div>
          
          {/* 胸部和脊椎 */}
          <div className="flex flex-col items-center">
            <div className={`w-20 h-24 rounded ${getColor(injuryScores.chest)} mb-1`} />
            <div className={`w-20 h-12 rounded ${getColor(injuryScores.spine)} mb-1`} />
            <div className={`w-20 h-12 rounded ${getColor(injuryScores.pelvis)}`} />
          </div>
          
          {/* 右臂 */}
          <div className="flex flex-col items-center ml-2">
            <div className={`w-8 h-12 rounded ${getColor(injuryScores.right_upper_arm)} mb-1`} />
            <div className={`w-8 h-12 rounded ${getColor(injuryScores.right_forearm)} mb-1`} />
            <div className={`w-8 h-8 rounded ${getColor(injuryScores.right_hand)}`} />
          </div>
        </div>
        
        {/* 腿部 */}
        <div className="flex mt-2">
          {/* 左腿 */}
          <div className="flex flex-col items-center mr-2">
            <div className={`w-8 h-16 rounded ${getColor(injuryScores.left_thigh)} mb-1`} />
            <div className={`w-8 h-16 rounded ${getColor(injuryScores.left_shin)} mb-1`} />
            <div className={`w-8 h-8 rounded ${getColor(injuryScores.left_foot)}`} />
          </div>
          
          {/* 右腿 */}
          <div className="flex flex-col items-center ml-2">
            <div className={`w-8 h-16 rounded ${getColor(injuryScores.right_thigh)} mb-1`} />
            <div className={`w-8 h-16 rounded ${getColor(injuryScores.right_shin)} mb-1`} />
            <div className={`w-8 h-8 rounded ${getColor(injuryScores.right_foot)}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
