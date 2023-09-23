import { pb } from "@/api/pocketbase";
import { Button, Modal, Flowbite } from "flowbite-react";
import { array, bool, func, string } from "prop-types";

function PopUpModal({ openModal, setOpenModal, myId, userFavorites, itemId, refetch }) {
  const customTheme = {
    button: {
      color: {
        primary: "bg-primary hover:bg-[#568783] text-white",
      },
    },
  };

  const handleDelete = async () => {
    const favorites = userFavorites.filter((el) => el !== itemId);
    try {
      await pb.collection("users").update(myId, {
        favorites,
      });
    } catch (error) {
      console.error(error);
    }

    refetch();
    setOpenModal(false);
  };

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              이 장소를 리스트에서 삭제합니다.
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="primary" onClick={handleDelete}>
                삭제
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                취소
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Flowbite>
  );
}

PopUpModal.propTypes = {
  myId: string,
  itemId: string,
  refetch: func,
  openModal: bool,
  setOpenModal: func,
  userFavorites: array,
};

export default PopUpModal;
