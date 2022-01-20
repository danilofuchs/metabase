import React, { ComponentType, useCallback, useMemo, useState } from "react";
import { jt, t } from "ttag";
import Settings from "metabase/lib/settings";
import Button from "metabase/core/components/Button";
import ExternalLink from "metabase/components/ExternalLink";
import Modal from "metabase/components/Modal";
import SlackBadge from "../SlackBadge";
import SlackAppsButton from "../SlackAppsButton";
import SlackDeleteModal from "../SlackDeleteModal";
import {
  StatusFooter,
  StatusHeader,
  StatusMessage,
  StatusMessageText,
  StatusPrimary,
  StatusRoot,
  StatusSecondary,
  StatusTitle,
} from "./SlackStatus.styled";

export interface SlackStatusProps {
  Form: ComponentType;
  isValid?: boolean;
  onDelete: () => void;
}

const SlackStatus = ({
  Form,
  isValid,
  onDelete,
}: SlackStatusProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpened(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  const docsUrl = useMemo(() => {
    return Settings.docsUrl("administration-guide/09-setting-up-slack");
  }, []);

  return (
    <StatusRoot>
      <StatusHeader>
        <StatusPrimary>
          <StatusTitle>{t`Metabase on Slack`}</StatusTitle>
          <StatusMessage>
            <SlackBadge isValid={isValid} />{" "}
            {!isValid && (
              <StatusMessageText>
                {jt`Need help? ${(
                  <ExternalLink href={docsUrl}>{t`See our docs`}</ExternalLink>
                )}.`}
              </StatusMessageText>
            )}
          </StatusMessage>
        </StatusPrimary>
        <StatusSecondary>
          <SlackAppsButton />
        </StatusSecondary>
      </StatusHeader>
      <Form />
      <StatusFooter>
        <Button onClick={handleOpen}>{t`Delete Slack App`}</Button>
      </StatusFooter>
      {isOpened && (
        <Modal isOpen={isOpened} full={false} onClose={handleClose}>
          <SlackDeleteModal onDelete={onDelete} onClose={handleClose} />
        </Modal>
      )}
    </StatusRoot>
  );
};

export default SlackStatus;
