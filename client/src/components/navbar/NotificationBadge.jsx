import { Circle, Float } from "@chakra-ui/react";

const MAX_SHOWN_COUNT = 9;

const NotificationBadge = ({ count }) => {
  if (count === 0) return null;

  return (
    <Float placement="top-end" offset={2}>
      <Circle
        size={5}
        bg="red.solid"
        color="white"
        fontSize="2xs"
        fontWeight="bold"
      >
        {count > MAX_SHOWN_COUNT ? `${MAX_SHOWN_COUNT}+` : count}
      </Circle>
    </Float>
  );
};

export default NotificationBadge;