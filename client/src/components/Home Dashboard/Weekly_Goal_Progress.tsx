interface WeeklyGoalProgressProps {
      current: number;
      goal: number;
}

const WeeklyGoalProgress = ({ current, goal }: WeeklyGoalProgressProps) => {
      const progress = (current / goal) * 100;
      const remaining = goal - current;

      return (
            <div className="card">
                  <h3>Weekly Goal Progress</h3>
                  <div className="progress-bar">
                        <svg className="progress-fill" viewBox="0 0 100 10" preserveAspectRatio="none">
                              <rect x="0" y="0" width={Math.min(progress, 100)} height="10" rx="999" fill="#a855f7" />
                        </svg>
                  </div>
                  <p>{current} / {goal} km</p>
                  <p>{remaining}km remaining to reach your peak performance target.</p>
            </div>
      );
};

export default WeeklyGoalProgress;
