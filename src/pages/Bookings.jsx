import Heading from "../shared/ui/Heading";
import Row from "../shared/ui/Row";
import BookingTable from "../features/bookings/components/BookingTable";
import BookingTableOperations from "../features/bookings/components/BookingTableOperations";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
