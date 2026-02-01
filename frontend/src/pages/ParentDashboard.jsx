import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";

const ParentDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">
                👨‍👩‍👧 Parent Dashboard
            </h1>

            {/* Overview */}
            <Card>
                <h2 className="text-xl font-semibold mb-2">Child Overview</h2>
                <p className="text-gray-700">
                    Dyslexia Risk Level: <b>Moderate</b>
                </p>
                <p className="text-gray-700">
                    Learning Profile: <b>Phonological</b>
                </p>
            </Card>

            {/* Skill Progress */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
                <Card>
                    <h3 className="font-semibold mb-2">Phoneme Recognition</h3>
                    <ProgressBar value={65} />
                </Card>

                <Card>
                    <h3 className="font-semibold mb-2">Letter Identification</h3>
                    <ProgressBar value={50} />
                </Card>

                <Card>
                    <h3 className="font-semibold mb-2">Reading Fluency</h3>
                    <ProgressBar value={40} />
                </Card>

                <Card>
                    <h3 className="font-semibold mb-2">Visual Processing</h3>
                    <ProgressBar value={70} />
                </Card>
            </div>

            {/* Error Patterns */}
            <Card className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Common Difficulties</h2>
                <ul className="list-disc ml-5 text-gray-700">
                    <li>Confusion between <b>b</b> and <b>d</b></li>
                    <li>Difficulty with <b>sh</b> and <b>ch</b> sounds</li>
                </ul>
            </Card>

            {/* Recommendations */}
            <Card className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Weekly Recommendations</h2>
                <ul className="list-disc ml-5 text-gray-700">
                    <li>Play “Sound Catcher” for 10 minutes, 4 times this week</li>
                    <li>Practice letter matching games at home</li>
                </ul>
            </Card>
        </div>
    );
};

export default ParentDashboard;
