import {ReactNode} from "react";
import {
  ChartLine,
  CloudUpload,
  File,
  ListPlus,
  LoaderCircle,
  UserPen,
} from "lucide-react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="col-md p-3 border rounded">
    <div className="d-flex gap-2">
      {icon}
      <p className="fw-bold mb-0">{title}</p>
    </div>
    <p className="font-14 mb-0">{description}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section className="features pt-4" id="features">
      <h2 className="fw-bolder">Features</h2>
      <div className="container d-grid gap-3 py-2">
        <div className="row gap-3">
          <FeatureCard
            icon={<UserPen />}
            title="Multiple Course Tracking"
            description="Track all your course grades in one place."
          />
          <FeatureCard
            icon={<ListPlus />}
            title="Customizable Course Structures"
            description="Designed to match any university’s course structure (assignments, graded quizzes, final exams, and their respective weights)."
          />
          <FeatureCard
            icon={<CloudUpload />}
            title="Secure Cloud Storage"
            description="Course grade data is securely stored in the cloud, ensuring that your data is accessible, anytime, anywhere."
          />
        </div>

        <div className="row gap-3">
          <FeatureCard
            icon={<LoaderCircle />}
            title="Progress Tracking"
            description="Monitor your academic progress over time with detailed charts and reports."
          />
          <FeatureCard
            icon={<ChartLine />}
            title="Predict GPA Scenarios"
            description="Implement different grading scenarios to see how they impact your final grade outcomes."
          />
          <FeatureCard
            icon={<File />}
            title="Data Export Options"
            description="Seamlessly download your grade data in various formats."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
