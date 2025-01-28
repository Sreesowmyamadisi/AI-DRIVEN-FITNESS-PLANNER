import React from 'react';

interface FitnessPlan {
  day: string;
  exercises: string[];
  setsReps: string[];
  restPeriod: string;
  notes: string;
}

interface Props {
  planText: string;
}

export function FitnessPlanTable({ planText }: Props) {
  const parseTable = (text: string): { plan: FitnessPlan[], tips: string[] } => {
    const [tableSection, tipsSection] = text.split('Additional Tips and Precautions:');
    
    // Parse table rows
    const rows = tableSection
      .trim()
      .split('\n')
      .filter(row => row.includes('|'))
      .slice(2); // Skip header and separator rows
    
    const plan = rows.map(row => {
      const [day, exercises, setsReps, restPeriod, notes] = row
        .split('|')
        .slice(1, -1)
        .map(cell => cell.trim());
      
      return {
        day,
        exercises: exercises.split('<br>').map(e => e.trim()),
        setsReps: setsReps.split('<br>').map(s => s.trim()),
        restPeriod,
        notes
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
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Exercises</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sets x Reps</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rest Period</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-dark-200 bg-opacity-50 divide-y divide-gray-700">
            {plan.map((day, idx) => (
              <tr key={idx} className="hover:bg-dark-100 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {day.day}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {day.exercises.map((exercise, i) => (
                    <React.Fragment key={i}>
                      {exercise}
                      {i < day.exercises.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {day.setsReps.map((set, i) => (
                    <React.Fragment key={i}>
                      {set}
                      {i < day.setsReps.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {day.restPeriod}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {day.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
          Additional Tips and Precautions
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