import React from 'react';

interface DietPlan {
  day: string;
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snacks: string[];
}

interface Props {
  planText: string;
}

export function DietPlanTable({ planText }: Props) {
  const parseTable = (text: string): { plan: DietPlan[], tips: string[] } => {
    const [tableSection, tipsSection] = text.split('Additional Diet Tips:');
    
    // Parse table rows
    const rows = tableSection
      .trim()
      .split('\n')
      .filter(row => row.includes('|'))
      .slice(2); // Skip header and separator rows
    
    const plan = rows.map(row => {
      const [day, breakfast, lunch, dinner, snacks] = row
        .split('|')
        .slice(1, -1)
        .map(cell => cell.trim());
      
      return {
        day,
        breakfast: breakfast.split('<br>').map(e => e.trim()),
        lunch: lunch.split('<br>').map(e => e.trim()),
        dinner: dinner.split('<br>').map(e => e.trim()),
        snacks: snacks.split('<br>').map(e => e.trim())
      };
    });

    // Parse tips
    const tips = tipsSection
      .trim()
      .split('\n')
      .filter(line => line.trim().startsWith('*'))
      .map(tip => tip.replace('*', '').trim());

    return { plan, tips };
  };

  const { plan, tips } = parseTable(planText);

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-dark-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Day</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Breakfast</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Lunch</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Dinner</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Snacks</th>
            </tr>
          </thead>
          <tbody className="bg-dark-200 bg-opacity-50 divide-y divide-gray-700">
            {plan.map((day, idx) => (
              <tr key={idx} className="hover:bg-dark-100 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{day.day}</td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {day.breakfast.map((item, i) => (
                    <React.Fragment key={i}>
                      {item}
                      {i < day.breakfast.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {day.lunch.map((item, i) => (
                    <React.Fragment key={i}>
                      {item}
                      {i < day.lunch.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {day.dinner.map((item, i) => (
                    <React.Fragment key={i}>
                      {item}
                      {i < day.dinner.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {day.snacks.map((item, i) => (
                    <React.Fragment key={i}>
                      {item}
                      {i < day.snacks.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
          Additional Diet Tips
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          {tips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 