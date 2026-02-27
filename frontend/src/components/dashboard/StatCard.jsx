// src/components/StatCard.jsx

export default function StatCard({ icon, title, value, percentage, color, badge }) {
  const colorMap = {
    purple: {
      iconBg: "bg-purple-100 text-purple-600",
      blob: "bg-purple-100/70",
      badge: "bg-green-100 text-green-600",
    },
    green: {
      iconBg: "bg-green-100 text-green-600",
      blob: "bg-green-100/70",
      badge: "bg-green-100 text-green-600",
    },
    red: {
      iconBg: "bg-red-100 text-red-500",
      blob: "bg-red-100/70",
      badge: "bg-red-100 text-red-500",
    },
    yellow: {
      iconBg: "bg-yellow-100 text-yellow-600",
      blob: "bg-yellow-100/70",
      badge: "bg-yellow-100 text-yellow-600",
    },
  };

  const styles = colorMap[color];

  return (
    <div className="relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      
      {/* Decorative top-right curve */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gray-100 opacity-50"></div>

      {/* Soft colored blob under the curve */}
      <div
        className={`absolute top-0 right-0 w-32 h-24 rounded-bl-[80px] ${styles.blob}`}
      />

      {/* Badge / Percentage */}
      {percentage || badge ? (
        <span
          className={`absolute top-4 right-4 text-xs font-medium px-2 py-1 rounded-full ${styles.badge}`}
        >
          {percentage || badge}
        </span>
      ) : null}

      {/* Icon */}
      <div
        className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center ${styles.iconBg}`}
      >
        <i className={`${icon} text-xl`}></i>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-6">
        <h3 className="text-3xl font-bold">{value}</h3>
        <p className="text-gray-500 text-sm">{title}</p>
      </div>
    </div>
  );
}