import '~/styles/DotSpinner.module.css';

function DotSpinner({ className }: { className?: string }) {
    return (
        <div className={`dot-spinner ${className}`}>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
        </div>
    );
}

export default DotSpinner;
