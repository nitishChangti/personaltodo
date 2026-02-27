import TaskCard from "../taskboard/TaskCard.jsx";

export default function ImportantTaskCard(props) {
  return (
    <div className="w-full max-w-[360px] border-l-4 border-orange-400 rounded-2xl">
      <TaskCard {...props} />
    </div>
  );
}