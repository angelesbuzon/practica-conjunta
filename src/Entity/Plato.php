<?php

namespace App\Entity;

use App\Repository\PlatoRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PlatoRepository::class)]
class Plato
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nombre = null;

    #[ORM\Column(length: 255)]
    private ?string $urlImg = null;

    #[ORM\Column(length: 255)]
    private ?string $origen = null;

    #[ORM\Column(length: 255)]
    private ?string $precio = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $api_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): static
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getUrlImg(): ?string
    {
        return $this->urlImg;
    }

    public function setUrlImg(string $urlImg): static
    {
        $this->urlImg = $urlImg;

        return $this;
    }

    public function getOrigen(): ?string
    {
        return $this->origen;
    }

    public function setOrigen(string $origen): static
    {
        $this->origen = $origen;

        return $this;
    }

    public function getPrecio(): ?string
    {
        return $this->precio;
    }

    public function setPrecio(string $precio): static
    {
        $this->precio = $precio;

        return $this;
    }

    public function getApiId(): ?string
    {
        return $this->api_id;
    }

    public function setApiId(?string $api_id): static
    {
        $this->api_id = $api_id;

        return $this;
    }
}
