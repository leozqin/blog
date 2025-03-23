FROM registry.fedoraproject.org/fedora-toolbox:41

ARG NAME=blog
LABEL com.github.containers.toolbox="true" \
      name=blog \
      version="1.0.0" \
      usage="This image is meant to be used with the toolbox(1) command" \
      summary="Image for creating toolbox container for my blog"

RUN rpmkeys --import https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/-/raw/master/pub.gpg
RUN printf "[gitlab.com_paulcarroty_vscodium_repo]\nname=download.vscodium.com\nbaseurl=https://download.vscodium.com/rpms/\nenabled=1\ngpgcheck=1\nrepo_gpgcheck=1\ngpgkey=https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/-/raw/master/pub.gpg\nmetadata_expire=1h\n" | sudo tee -a /etc/yum.repos.d/vscodium.repo

RUN dnf check-update && dnf -y install codium curl nodejs

