import GaragePage from '../../pom/pages/GaragePage';
import AddCarForm from '../../pom/forms/AddCarForm';
import EditCarForm from '../../pom/forms/EditCarForm';
import ConfirmModal from '../../pom/components/ConfirmModal';

export const GarageFlows = {
  addSameCarNTimes({ brand, model, count = 25, startMileage = 10000 }) {
    return Cypress._.times(count).reduce(
      (chain, i) => {
        return chain.then(() => {
          GaragePage.openAddCarForm();
          AddCarForm.addCar({
            brand,
            model,
            mileage: startMileage + i,
          });
        });
      },
      cy.then(() => {}),
    );
  },

  deleteAllCars() {
    const deleteNext = () => {
      return cy.get('body').then(($body) => {
        // если пустой гараж — выходим
        const isEmpty =
          $body.find('.panel-empty_message:contains("You don’t have any cars")').length > 0;
        if (isEmpty) return;

        // если есть хотя бы одна машина — удаляем последнюю
        const editBtns = $body.find('.btn-edit');
        if (editBtns.length === 0) return; // на всякий случай

        // клик по последней edit-кнопке через jQuery-элемент
        cy.wrap(editBtns.last()).click();

        EditCarForm.clickRemoveCarButton();
        ConfirmModal.confirm();

        // после удаления повторяем
        return deleteNext();
      });
    };

    return deleteNext();
  },
};
