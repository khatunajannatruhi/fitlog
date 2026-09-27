import MyPlanClient from './MyPlanClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Plan | FitLog',
  description: 'Manage your daily workout plan and saved exercises.',
};

export default function MyPlan() {
  return <MyPlanClient />;
}
