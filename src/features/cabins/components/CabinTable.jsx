import styled from "styled-components";
import Spinner from "../../../shared/ui/Spinner"
//import CabinRow from "./CabinRow";
import { useCabins } from "../hooks/useCabins";
import Table from "../../../shared/ui/Table";
import Menus from "../../../shared/ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../../shared/ui/Empty";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "../hooks/useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
//import { useCreateCabin } from "../hooks/useCreateCabin";
import { formatCurrency } from "../../../shared/utils/helpers";
import Modal from "../../../shared/ui/Modal";
import ConfirmDelete from "../../../shared/ui/ConfirmDelete";
import AddCabin from "./AddCabin";


const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;


function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
    const { isDeleting, deleteCabin } = useDeleteCabin();
   // const { isCreating, createCabin } = useCreateCabin();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  /*
  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }
    */
  
  return (
    <>
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) =>  <Table.Row>
                <Img src={cabin.image} />
                <Cabin>{cabin.name}</Cabin>
                <div>Fits up to {cabin.maxCapacity} guests</div>
                <Price>{formatCurrency(cabin.regularPrice)}</Price>
                {cabin.discount ? (
                  <Discount>{formatCurrency(cabin.discount)}</Discount>
                ) : (
                  <span>&mdash;</span>
                )}
                <div>
                  <Modal>
                    <Menus.Menu>
                      <Menus.Toggle id={cabin.id} />
          
                      <Menus.List id={cabin.id}>
                        <Menus.Button
                          icon={<HiSquare2Stack />}
                          //onClick={handleDuplicate}
                          //disabled={isCreating}
                        >
                          Duplicate
                        </Menus.Button>
          
                        <Modal.Open opens="edit">
                          <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                        </Modal.Open>
          
                        <Modal.Open opens="delete">
                          <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                        </Modal.Open>
                      </Menus.List>
          
                      <Modal.Window name="edit">
                        <CreateCabinForm cabinToEdit={cabin} />
                      </Modal.Window>
          
                      <Modal.Window name="delete">
                        <ConfirmDelete
                          resourceName="cabins"
                          disabled={isDeleting}
                          onConfirm={() => deleteCabin(cabin.id)}
                        />
                      </Modal.Window>
                    </Menus.Menu>
                  </Modal>
                </div>
              </Table.Row>}
        />
      </Table>
    </Menus>
    <AddCabin/>
    </>
  );
}

export default CabinTable;
