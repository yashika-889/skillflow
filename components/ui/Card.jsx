// Helper function to combine class names
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  
  export default function Card({ children, className = '', ...props }) {
    return (
      <div
        className={cn(
          'card-glass', // This applies all the styles from globals.css
          className     // This adds any extra classes you pass
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
  
  /* Example Usage:
  <Card>
    <p>This content is inside a glass card.</p>
  </Card>
  
  <Card className="p-10 text-center">
    <p>This is a card with extra padding and centered text.</p>
  </Card>
  */