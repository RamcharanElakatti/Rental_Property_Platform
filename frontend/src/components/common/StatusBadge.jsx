import { statusTone } from '../../utils/format.js';

export default function StatusBadge({ status }) {
  return <span className={`badge text-bg-${statusTone(status)} status-badge`}>{status}</span>;
}
